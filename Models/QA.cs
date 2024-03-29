﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class QA
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int Status { get; set; } = 1;
        [DisplayName("Created At")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Guid? CreatedById { get; set; }
        [DisplayName("Created By")]
        public Admin? CreatedBy { get; set; }
        [DisplayName("Modified At")]
        public DateTime? ModifiedAt { get; set; }
        public Guid? ModifiedId { get; set; }
        [DisplayName("Modified By")]
        public Admin? ModifiedBy { get; set; }
    }
}
