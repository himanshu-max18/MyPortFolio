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
        public async Task<ActionResult<IEnumerable<ContactDto>>> Get(CancellationToken ct)
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
        public async Task<ActionResult<ContactDto>> GetById(int id, CancellationToken ct)
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
        public async Task<ActionResult<ContactDto>> Create([FromBody] ContactDto contactDto, CancellationToken ct)
        {
            try
            {
                await _contactService.CreateContactDtoAsync(contactDto, ct);
                return StatusCode(201, "Message sent successfully!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in Create");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
