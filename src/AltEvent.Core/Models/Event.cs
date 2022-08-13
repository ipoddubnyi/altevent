using AltEvent.Core.Utils;
using System.Text.Json.Serialization;

namespace AltEvent.Core.Models
{
    public class Event : BaseEntity
    {
        public long Id { get; set; }

        public long CompanyId { get; set; }

        public long CreatorId { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public bool AllDay { get; set; }

        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly StartDate { get; set; }

        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly EndDate { get; set; }

        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly? StartTime { get; set; }

        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly? EndTime { get; set; }

        public string Location { get; set; }

        public int Capacity { get; set; }

        [JsonIgnore]
        public bool IsDeleted { get; set; }

        //

        public Company Company { get; set; }

        public User Creator { get; set; }

        //

        public ICollection<User> Hosts { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
    }
}
