import GenreCard from "./GenreCard";

const GenreList = props => {
  return props.genreList.length > 0 ? (
    <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,_minmax(min(350px,_100%),_1fr))]">
      {props.genreList.map((genreObj, index) => (
        <GenreCard key={index} genre={genreObj}></GenreCard>
      ))}
    </div>
  ) : (
    ""
  );
};

export default GenreList;
