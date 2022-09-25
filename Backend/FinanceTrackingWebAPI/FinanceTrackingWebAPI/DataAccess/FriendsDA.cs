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
        IEnumerable<Friend> friends(string userId);
        bool friend(Friend friends);
        bool delete(string friendId);

    }
    public class FriendsDA : IFriendsDA
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

        public bool friend(Friend friends)
        {
            //var friendAlreadyExists = _context.Friends.Where(x => x.FriendUserId == friends.FriendUserId).Any();
            var result = _context.Friends.Add(friends);
            if(result != null)
            {
                _context.SaveChanges();
                return true;
            }
            return false;

            
        }


        public IEnumerable<Friend> friends(string userId)
        {
            return _context.Friends.Where(x => x.UserId == userId).Include(x => x.applicationUser).ToList();
        }
    }
}
