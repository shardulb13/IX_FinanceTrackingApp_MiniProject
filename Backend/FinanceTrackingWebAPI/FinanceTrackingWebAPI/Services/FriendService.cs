using FinanceTrackingWebAPI.Authentication;
using FinanceTrackingWebAPI.DataAccessLayer;
using FinanceTrackingWebAPI.Entities;
using FinanceTrackingWebAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.Services
{
    public interface IFriendsService
    {
        IEnumerable<FriendVM> friends(string userId);
        bool Friend(FriendVM friends);
        bool Delete(string friendUserId);

    }
    public class FriendService : IFriendsService
    {
        private readonly IFriendsDA _friendsDA;
        public FriendService(IFriendsDA friendsDA)
        {
            _friendsDA = friendsDA;
        }

        public bool Delete(string friendUserId)
        {
            return _friendsDA.delete(friendUserId);
        }

        public bool Friend(FriendVM friends)
        {
            foreach (var friendUserId in friends.FriendUserId)
            {
                var friendsModel = new Friend
                {
                    UserId = friends.UserId,
                    FriendUserId = friendUserId,
                };
                 _friendsDA.friend(friendsModel);
                var friendsModelForFriend = new Friend
                {
                    UserId = friendUserId,
                    FriendUserId = friends.UserId
                };
                 _friendsDA.friend(friendsModelForFriend);
            }
            return true;
        }

        public IEnumerable<FriendVM> friends(string userId)
        {
            var result = _friendsDA.friends(userId).GroupBy(i => i.UserId);
            if (result != null)
            {
                return (from exp in result
                        select new FriendVM
                        {
                            UserId = exp.Key,
                            FriendUserId = exp.Select(x=>x.applicationUser.UserName).ToList()
                            //FriendUserId = exp.Select(x=>x.FriendUserId).ToList(),
                            //FriendUserName = exp.Select(x=>x.applicationUser.UserName).ToString(),
                        });
            }
            return null;
        }
    }
}
