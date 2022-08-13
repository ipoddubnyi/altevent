using AltEvent.Api.Utils;
using AltEvent.Core.Dtos;
using AltEvent.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AltEvent.Api.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            this.authRepository = authRepository;
        }

        [HttpPost]
        [Route("registration")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthResultDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<AuthResultDto>> Register(
            [FromBody] AuthRegistrationDto dto)
        {
            try
            {
                var result = await authRepository.RegisterAsync(dto);
                if (result == null)
                    return ErrorResponse.BadRequest(
                        "Invalid login or password.",
                        ErrorResponse.ERROR_AUTH_INVALID_LOGIN_PASSWORD);

                return Ok(result);
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthResultDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<AuthResultDto>> Login(
            [FromBody] AuthLoginDto dto)
        {
            try
            {
                var result = await authRepository.LoginAsync(dto);
                if (result == null)
                    return ErrorResponse.BadRequest(
                        "Invalid login or password.",
                        ErrorResponse.ERROR_AUTH_INVALID_LOGIN_PASSWORD);

                return Ok(result);
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }
    }
}
