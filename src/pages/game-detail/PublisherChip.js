import { Link } from "react-router-dom";

const PublisherChip = props => {
  return (
    <Link
      to={`/publishers/${props.publisherSlug}`}
      className="px-[15px] py-[6px] rounded-md bg-neu1-3 dark:bg-neu1-8 hover:bg-accent1 dark:hover:bg-accent1 group duration-100"
    >
      <span className="font-OpenSans text-neu1-7 dark:text-neu1-3 font-bold text-[14px] group-hover:text-neu1-2">{props.name}</span>
    </Link>
  );
};

export default PublisherChip;