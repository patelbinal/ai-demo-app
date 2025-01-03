using System;
using System.ComponentModel.DataAnnotations;

public class ExpenseLite
{
    [Required]
    public decimal Amount { get; set; }

    public string Description { get; set; }

    public int CategoryId { get; set; }
}