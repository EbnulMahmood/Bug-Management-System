using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Admin
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
