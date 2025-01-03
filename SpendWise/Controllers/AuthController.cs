using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using SpendWise.Models;

[Route("api/[controller]")]
[ApiController]
[EnableCors("AllowSpecificOrigin")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly ApplicationDbContext _context;
    public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _context = context;
    }

    // POST: api/Auth/Register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var user = new User { UserName = model.Email, Email = model.Email, Name = model.Name };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            return Ok(new { Message = "User registered successfully!" });
        }
        return BadRequest(result.Errors);
    }

    // POST: api/Auth/Login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return Unauthorized(new { Message = "Invalid credentials" });
        }

        var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
        if (result.Succeeded)
        {
            return Ok(new { Message = "Logged in successfully!" });
        }
        return Unauthorized(new { Message = "Invalid credentials" });
    }

    // POST: api/Auth/Logout
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { Message = "Logged out successfully!" });
    }
    
    [HttpGet("me")]
    [Authorize] // This ensures only authenticated users can access this endpoint
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        var user = await _context.Users.FindAsync(userId);
        if (user == null) return Unauthorized();

        return Ok(new
        {
            user.Id,
            user.Name,
            user.Email
        });
    }

}