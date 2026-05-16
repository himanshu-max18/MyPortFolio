using MyPortFolio.Server.DTOs;

namespace MyPortFolio.Server.Services.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<ContactResponseDto>> GetContactDtoAsync(CancellationToken ct = default);
        Task<ContactResponseDto?> GetContactDtoByIdAsync(int id, CancellationToken ct = default);
        Task<ContactResponseDto> CreateContactDtoAsync(CreateContactDto contactDto, CancellationToken ct = default);
        Task<ContactResponseDto> MarkAsReadAsync(int id, CancellationToken ct = default);
        Task DeleteContactAsync(int id, CancellationToken ct = default);
    }
}
