using AltEvent.Core.Models;

namespace AltEvent.Core.Dtos
{
    public class ReservationCreateResultDto
    {
        public Reservation Reservation { get; set; }

        public int AccessCode { get; set; }
    }
}
