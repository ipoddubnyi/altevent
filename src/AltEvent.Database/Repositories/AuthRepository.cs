using AltEvent.Core.Dtos;
using AltEvent.Core.Models;
using AltEvent.Core.Repositories;
using AltEvent.Core.Services;
using AltEvent.Database.Utils;
using System.Security.Claims;

namespace AltEvent.Database.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        // TODO: вынести в ресурсы, учесть возможность использования разных языков
        private const string COMPANY_DEFAULT_NAME = "Моя компания";

        private readonly DatabaseContext context;
        private readonly IUserRepository userRepository;
        private readonly ICompanyRepository companyRepository;
        private readonly ITokenService tokenService;
        private readonly ICryptoService cryptoService;

        public AuthRepository(
            DatabaseContext context,
            IUserRepository userRepository,
            ICompanyRepository companyRepository,
            ITokenService tokenService,
            ICryptoService cryptoService)
        {
            this.context = context;
            this.userRepository = userRepository;
            this.companyRepository = companyRepository;
            this.tokenService = tokenService;
            this.cryptoService = cryptoService;
        }

        public async Task<AuthResultDto?> RegisterAsync(AuthRegistrationDto dto)
        {
            var user = await userRepository.GetByEmailAsync(dto.Email);
            if (user != null)
                throw new ApplicationException("Email is already registered.");

            var result = await Transaction.BeginAsync(context, async handler => {
                var options = new CreateOptions() { Transaction = handler };

                // создание пользователя
                user = await userRepository.CreateAsync(new UserCreateDto()
                {
                    Name = dto.Name,
                    Email = dto.Email,
                    Password = cryptoService.Hash(dto.Password),
                }, options);

                if (user == null)
                    throw new ApplicationException("Unable to create user.");

                // создание компании
                var company = await companyRepository.CreateAsync(new CompanyCreateDto()
                {
                    Name = COMPANY_DEFAULT_NAME,
                    Users = new List<User>() { user },
                }, options);

                if (company == null)
                    throw new ApplicationException("Unable to create company.");

                return MakePayload(user, company);
            });

            return result;
        }

        public async Task<AuthResultDto?> LoginAsync(AuthLoginDto dto)
        {
            var user = await userRepository.GetByEmailAsync(dto.Email);
            if (user == null)
                throw new ApplicationException("Invalid login or password.");

            if (!cryptoService.Verify(dto.Password, user.Password))
                throw new ApplicationException("Invalid login or password.");

            // TODO: у юзера может быть несколько компаний
            var company = await companyRepository.GetByUserAsync(user);
            if (company == null)
                throw new ApplicationException("Invalid login or password.");

            return MakePayload(user, company);
        }

        public async Task<AuthResultDataDto?> LoadDataAsync(long userId)
        {
            var user = await userRepository.GetAsync(userId);
            if (user == null)
                throw new ApplicationException("Invalid user id.");

            // TODO: у юзера может быть несколько компаний
            var company = await companyRepository.GetByUserAsync(user);
            if (company == null)
                throw new ApplicationException("Invalid company.");

            return MakePayloadData(user, company);
        }

        private AuthResultDto MakePayload(User user, Company company)
        {
            var token = tokenService.GenerateAccessToken(new ClaimsIdentity(new Claim[]
                {
                    new Claim("User", user.Id.ToString()),
                    new Claim("Company", company.Id.ToString()),
                }));

            return new AuthResultDto
            {
                AccessToken = token,
                Data = MakePayloadData(user, company),
            };
        }

        private AuthResultDataDto MakePayloadData(User user, Company company)
        {
            return new AuthResultDataDto()
            {
                User = user,
                Company = company,
            };
        }
    }
}
