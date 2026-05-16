using MyPortFolio.Server.Data;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MyPortFolio.Server.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly PortfolioDbContext _context;
        public ContactRepository(PortfolioDbContext context)
        {
            this._context = context;
        }
        
        public async Task<IEnumerable<Contact>> GetContactsAsync(CancellationToken ct = default)
        {
            return await _context.Contacts.AsNoTracking().ToListAsync(ct);
        }

        public async Task<Contact?> GetContactByIdAsync(int id, CancellationToken ct = default)
        {
            return await _context.Contacts.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
        }

        public async Task<Contact> CreateContactAsync(Contact contact, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(contact);
            contact.SentAt = DateTime.UtcNow;
            contact.IsRead = false;

            await _context.Contacts.AddAsync(contact, ct);
            await _context.SaveChangesAsync(ct);

            return contact;
        }

        public async Task<Contact> MarkAsReadAsync(int id, CancellationToken ct = default)
        {
            var contact = await GetContactByIdAsync(id, ct);
            if (contact == null)
                throw new KeyNotFoundException($"Contact with id {id} not found.");

            contact.IsRead = true;
            await _context.SaveChangesAsync(ct);
            return contact;
        }

        public async Task DeleteContactAsync(int id, CancellationToken ct = default)
        {
            var contact = await GetContactByIdAsync(id, ct);
            if (contact == null)
                throw new KeyNotFoundException($"Contact with id {id} not found.");

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync(ct);
        }
    }
}
