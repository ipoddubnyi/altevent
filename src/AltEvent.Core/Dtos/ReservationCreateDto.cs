namespace AltEvent.Core.Dtos
{
    public class ReservationCreateDto
    {
        public long EventId { get; set; }

        public string Name { get; set; }

        public string? Comment { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }
    }
}
