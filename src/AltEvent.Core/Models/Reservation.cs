using System.Text.Json.Serialization;

namespace AltEvent.Core.Models
{
    public class Reservation : BaseEntity
    {
        public long Id { get; set; }

        public long EventId { get; set; }

        public string Name { get; set; }

        public string? Comment { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        [JsonIgnore]
        public int AccessCode { get; set; }

        //

        [JsonIgnore] // TODO: иначе будет циклическая зависимость
        public Event Event { get; set; }
    }
}
