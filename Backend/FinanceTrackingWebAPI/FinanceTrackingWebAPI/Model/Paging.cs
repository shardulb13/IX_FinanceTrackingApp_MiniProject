namespace FinanceTrackingWebAPI.Model
{
    public class Paging
    {
        const int maxPageSize = 20;
        public int? pageNumber { get; set; }
        public int? _pageSize { get; set; } 

        public int? pageSize
        {
            get { return _pageSize; }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}
