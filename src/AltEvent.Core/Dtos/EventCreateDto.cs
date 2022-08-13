using AltEvent.Core.Models;

namespace AltEvent.Core.Dtos
{
    public class EventCreateDto
    {
        public long CreatorId { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public bool AllDay { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public string? StartTime { get; set; }

        public string? EndTime { get; set; }

        public string Location { get; set; }

        public int Capacity { get; set; }

        //

        public ICollection<User> Hosts { get; set; } = new List<User>();
    }
}
