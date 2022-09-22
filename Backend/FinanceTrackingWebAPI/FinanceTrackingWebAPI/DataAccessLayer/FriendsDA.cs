using FinanceTrackingWebAPI.Authentication;
using FinanceTrackingWebAPI.Data;
using FinanceTrackingWebAPI.Entities;
using FinanceTrackingWebAPI.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.DataAccessLayer
{
    public interface IFriendsDA
    {
        IEnumerable<Friends> friends(string userId);
        Task<int> friend(Friends friends);
        bool delete(string friendId);

    }
    public class FriendsDA: IFriendsDA
    {
        private readonly ApplicationDbContext _context;
        public FriendsDA(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool delete(string friendUserId)
        {
            var result = _context.Friends.Where(a => a.applicationUser.UserName == friendUserId || a.ApplicationUser.UserName == friendUserId);
            if (result != null)
            {
                _context.Friends.RemoveRange(result);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task<int> friend(Friends friends)
        {
            var result = await _context.Friends.AddAsync(friends);
            await _context.SaveChangesAsync();
            return friends.FriendId;
        }


        public IEnumerable<Friends> friends(string userId)
        {
            return _context.Friends.Where(x => x.UserId == userId).Include(x=>x.applicationUser).ToList();
        }
    }
}
