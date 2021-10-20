
namespace CommentsService.ResultTypes
{
    public class ExecutionOutcome<T>
    {
        public ExecutionOutcome()
        {

        }

        public string Message { get; set; }
        public T Data { get; set; }
        public int Code { get; set; }
    }
}
