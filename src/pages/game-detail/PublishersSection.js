import PublisherChip from "./PublisherChip";

const PublishersSection = props => {
  return (
    <section className="z-[2] relative mx-auto max-w-[1000px] py-[20px] border-b border-neu1-3 dark:border-neu1-7 flex flex-col">
      <h3 className="text-[28px] font-Lato font-black text-neu1-8 dark:text-neu1-2 block">Publishers</h3>
      <div className="mt-[15px] flex flex-wrap gap-[10px]">
        {props.publishers.map((publisher, index) => (
          <PublisherChip name={publisher.name} publisherSlug={publisher.slug} key={index}></PublisherChip>
        ))}
      </div>
    </section>
  );
};

export default PublishersSection;
