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

        public AuthResultDto? Register(AuthRegistrationDto dto)
        {
            var user = userRepository.GetByEmail(dto.Email);
            if (user != null)
                throw new ApplicationException("Email is already registered.");

            var result = Transaction.Begin(context, handler => {
                var options = new CreateOptions() { Transaction = handler };

                // создание пользователя
                user = userRepository.Create(new UserCreateDto()
                {
                    Name = dto.Name,
                    Email = dto.Email,
                    Password = cryptoService.Hash(dto.Password),
                }, options);

                if (user == null)
                    throw new ApplicationException("Unable to create user.");

                // создание компании
                var company = companyRepository.Create(new CompanyCreateDto()
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

        public AuthResultDto? Login(AuthLoginDto dto)
        {
            var user = userRepository.GetByEmail(dto.Email);
            if (user == null)
                throw new ApplicationException("Invalid login or password.");

            if (!cryptoService.Verify(dto.Password, user.Password))
                throw new ApplicationException("Invalid login or password.");

            // TODO: у юзера может быть несколько компаний
            var company = companyRepository.GetByUser(user);
            if (company == null)
                throw new ApplicationException("Invalid login or password.");

            return MakePayload(user, company);
        }

        public AuthResultDataDto? LoadData(long userId)
        {
            var user = userRepository.Get(userId);
            if (user == null)
                throw new ApplicationException("Invalid user id.");

            // TODO: у юзера может быть несколько компаний
            var company = companyRepository.GetByUser(user);
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
