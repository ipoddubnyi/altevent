namespace AltEvent.Core.Models
{
    public class Company : BaseEntity
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        //

        public ICollection<User> Users { get; set; }
    }
}
