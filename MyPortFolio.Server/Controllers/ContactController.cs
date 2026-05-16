using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ILogger<ContactController> _logger;
        private readonly IContactService _contactService;

        public ContactController(ILogger<ContactController> logger, IContactService contactService)
        {
            this._logger = logger;
            this._contactService = contactService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactResponseDto>>> Get(CancellationToken ct)
        {
            try
            {
                var result = await _contactService.GetContactDtoAsync(ct);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in Get");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactResponseDto>> GetById(int id, CancellationToken ct)
        {
            try
            {
                var result = await _contactService.GetContactDtoByIdAsync(id, ct);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in GetById");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ContactResponseDto>> Create([FromBody] CreateContactDto contactDto, CancellationToken ct)
        {
            try
            {
                await _contactService.CreateContactDtoAsync(contactDto, ct);
                return StatusCode(StatusCodes.Status201Created, new { Message = "Message sent successfully! " });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in Create");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPatch("{id}/read")]
        public async Task<ActionResult<ContactResponseDto>> MarkAsRead(int id, CancellationToken ct)
        {
            try
            {
                var updated = await _contactService.MarkAsReadAsync(id, ct);
                return Ok(updated);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken ct)
        {
            try
            {
                await _contactService.DeleteContactAsync(id, ct);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
