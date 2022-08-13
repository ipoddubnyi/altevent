using System.Text.Json.Serialization;

namespace AltEvent.Core.Models
{
    public class User : BaseEntity
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public string? Phone { get; set; }

        public string Email { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        //

        [JsonIgnore] // TODO: иначе будет циклическая зависимость
        public ICollection<Company> Companies { get; set; }

        [JsonIgnore]
        public ICollection<Event> Events { get; set; }
    }
}
