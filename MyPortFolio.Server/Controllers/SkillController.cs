using Microsoft.AspNetCore.Mvc;
using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly ILogger<SkillController> _logger;
        private readonly ISkillService _skillService;

        public SkillController(ILogger<SkillController> logger, ISkillService skillService)
        {
            _logger = logger;
            _skillService = skillService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SkillDto>>> Get(CancellationToken ct)
        {
            var result = await _skillService.GetSkillDtosAsync(ct);
            return Ok(result);
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<SkillDto>>> GetByCategory(string category, CancellationToken ct)
        {
            var result = await _skillService.GetSkillDtosByCategoryAsync(category, ct);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SkillDto>> GetById(int id, CancellationToken ct)
        {
            try
            {
                var result = await _skillService.GetSkillDtoByIdAsync(id, ct);

                if (result == null)
                    return NotFound();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving skill with ID {Id}", id);
                return StatusCode(500, "An error occurred while retrieving the skill.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<SkillDto>> Create([FromBody] SkillDto skillDto, CancellationToken ct)
        {
            try
            {
                var created = await _skillService.CreateSkillDtoAsync(skillDto, ct);

                return CreatedAtAction( nameof(GetById), new { id = created.Id }, created );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating skill");
                return StatusCode(500, "An error occurred while creating the skill.");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SkillDto>> Update(int id, [FromBody] SkillDto skillDto, CancellationToken ct)
        {
            try
            {
                var updated = await _skillService.UpdateSkillDtoAsync(id, skillDto, ct);
                return Ok(updated);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating skill with ID {Id}", id);
                return StatusCode(500, "An error occurred while updating the skill.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken ct)
        {
            try
            {
                await _skillService.DeleteSkillDtoAsync(id, ct);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting skill with ID {Id}", id);
                return StatusCode(500, "An error occurred while deleting the skill.");
            }   
        }
    }
}