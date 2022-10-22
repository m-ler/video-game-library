import GenreChip from "./GenreChip";

export default props => {
  return props.genres?.length > 0 ? (
    <section className="z-[2] relative mx-auto max-w-[1000px] py-[20px] border-b border-neu1-3 dark:border-neu1-7 flex flex-col">
      <h3 className="text-[28px] font-Lato font-black text-neu1-8 dark:text-neu1-2 block">Genres</h3>
      <div className="mt-[15px] flex flex-wrap gap-[10px]">
        {props.genres.map((genre, index) => (
          <GenreChip genre={genre.name} genreSlug={genre.slug} key={index}></GenreChip>
        ))}
      </div>
    </section>
  ) : (
    ""
  );
};
