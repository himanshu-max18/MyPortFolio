using MyPortFolio.Server.DTOs;

namespace MyPortFolio.Server.Services.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<ContactDto>> GetContactDtoAsync(CancellationToken ct = default);
        Task<ContactDto?> GetContactDtoByIdAsync(int id, CancellationToken ct = default);
        Task<ContactDto> CreateContactDtoAsync(ContactDto contactDto, CancellationToken ct = default);
    }
}
