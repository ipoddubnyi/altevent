using AltEvent.Api.Utils;
using AltEvent.Core.Dtos;
using AltEvent.Core.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AltEvent.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthTokenController : ControllerBase
    {
        private readonly IAuthRepository authRepository;

        public AuthTokenController(IAuthRepository authRepository)
        {
            this.authRepository = authRepository;
        }

        [HttpGet]
        [Route("load-data")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AuthResultDataDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<AuthResultDataDto>> LoadData()
        {
            try
            {
                var userId = (long?)HttpContext.Items["UserId"];
                if (userId == null)
                    return ErrorResponse.BadRequest(
                        "Invalid token.",
                        ErrorResponse.ERROR_AUTH_INVALID_TOKEN);

                var result = await authRepository.LoadDataAsync(userId.Value);
                if (result == null)
                    return ErrorResponse.BadRequest(
                        "Invalid token.",
                        ErrorResponse.ERROR_AUTH_INVALID_TOKEN);

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
