using AltEvent.Core.Models;

namespace AltEvent.Core.Dtos
{
    public class CompanyCreateDto
    {
        public string Name { get; set; }

        public string? Description { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
