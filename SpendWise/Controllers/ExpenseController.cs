using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ExpenseController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ExpenseController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Expense
    [HttpGet]
    public async Task<IActionResult> GetExpenses([FromQuery] string searchTerm, [FromQuery] int? categoryId, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        var query = _context.Expenses.AsQueryable();

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(e => e.Description.Contains(searchTerm));
        }
        
        if (categoryId.HasValue)
        {
            query = query.Where(e => e.CategoryId == categoryId);
        }
        
        if (startDate.HasValue)
        {
            query = query.Where(e => e.Date >= startDate);
        }
        
        if (endDate.HasValue)
        {
            query = query.Where(e => e.Date <= endDate);
        }
        
        var expenses = await query.Include(e => e.Category) // Only get current user's expenses
                                   .ToListAsync();

        return Ok(query);
    }

    // POST: api/Expense
    [HttpPost]
    public async Task<IActionResult> CreateExpense([FromBody] Expense expense)
    {
        if (ModelState.IsValid)
        {
            expense.UserId = User.Identity.Name; // Set the current user's ID
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExpenses), new { id = expense.ID }, expense);
        }
        return BadRequest(ModelState);
    }

    // PUT: api/Expense/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExpense(int id, [FromBody] Expense expense)
    {
        if (id != expense.ID)
        {
            return BadRequest();
        }

        var existingExpense = await _context.Expenses.FindAsync(id);
        if (existingExpense == null)
        {
            return NotFound();
        }

        existingExpense.Amount = expense.Amount;
        existingExpense.Description = expense.Description;
        existingExpense.Date = expense.Date;
        existingExpense.CategoryId = expense.CategoryId;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Expense/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExpense(int id)
    {
        var expense = await _context.Expenses.FindAsync(id);
        if (expense == null)
        {
            return NotFound();
        }

        _context.Expenses.Remove(expense);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
