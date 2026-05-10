using MyPortFolio.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace MyPortFolio.Server.Repositories.Interfaces
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetContactsAsync(CancellationToken ct = default);
        Task<Contact?> GetContactByIdAsync(int id, CancellationToken ct = default);
        Task<Contact> CreateContactAsync(Contact contact, CancellationToken ct = default);
    }
}
