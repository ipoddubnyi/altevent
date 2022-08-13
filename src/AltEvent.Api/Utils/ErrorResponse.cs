using Microsoft.AspNetCore.Mvc;

namespace AltEvent.Api.Utils
{
    public class ErrorResponse
    {
        public const int ERROR_AUTH_INVALID_LOGIN_PASSWORD = 0x0101;
        public const int ERROR_AUTH_INVALID_TOKEN = 0x0102;
        public const int ERROR_EVENT_NOT_FOUND = 0x0501;
        public const int ERROR_EVENT_NOT_CREATED = 0x0502;
        public const int ERROR_EVENT_NOT_UPDATED = 0x0503;
        public const int ERROR_EVENT_IS_FULL = 0x0505;
        public const int ERROR_RESERVATION_NOT_FOUND = 0x0601;
        public const int ERROR_RESERVATION_NOT_CREATED = 0x0602;
        public const int ERROR_RESERVATION_NOT_UPDATED = 0x0603;
        public const int ERROR_RESERVATION_CODE_NOT_VALID = 0x0605;
        public const int ERROR_UNKNOWN = 0xFFFF;

        public int Code { get; set; }

        public string Message { get; set; }

        public static ErrorResponse Create(string message, int code)
        {
            return new()
            {
                Code = code,
                Message = message,
            };
        }

        public static BadRequestObjectResult BadRequest(string message, int code = ERROR_UNKNOWN)
        {
            return new BadRequestObjectResult(Create(message, code));
        }
    }
}
