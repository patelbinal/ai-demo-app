using System;
using System.ComponentModel.DataAnnotations;

public class Expense
{
    public int ID { get; set; }

    [Required]
    public decimal Amount { get; set; }

    public string Description { get; set; }

    [Required]
    public DateTime Date { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; }

    public string UserId { get; set; }
    public User User { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ModifiedAt { get; set; }
}