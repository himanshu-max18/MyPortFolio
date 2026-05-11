using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationController : ControllerBase
    {
        private readonly ILogger<EducationController> _logger;
        private readonly IEducationService _educationService;

        public EducationController(ILogger<EducationController> logger, IEducationService educationService)
        {
            this._logger = logger;
            this._educationService = educationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EducationDto>>> Get(CancellationToken ct)
        {
            try
            {
                var result = await _educationService.GetEducationDtosAsync(ct);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in GetAll");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EducationDto>> GetById(int id, CancellationToken ct)
        {
            try
            {
                var result = await _educationService.GetEducationDtoByIdAsync(id, ct);
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
        public async Task<ActionResult<EducationDto>> Create([FromBody] EducationDto educationDto, CancellationToken ct)
        {
            try
            {
                await _educationService.CreateEducationDtoAsync(educationDto, ct);
                return StatusCode(201, "Created successfully!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in Create");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EducationDto educationDto, CancellationToken ct)
        {
            try
            {
                await _educationService.UpdateEducationDtoAsync(educationDto, id, ct);
                return NoContent(); 
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during Update");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken ct)
        {
            try
            {
                await _educationService.DeleteEducationDtoAsync(id, ct);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred During Delete");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}

