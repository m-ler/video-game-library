import PlatformCard from "./PlatformCard";

const PlatformList = props => {
  return props.platforms.length > 0 ? (
    <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,_minmax(min(350px,_100%),_1fr))]">
      {props.platforms.map((platformObj, index) => (
        <PlatformCard key={index} platform={platformObj}></PlatformCard>
      ))}
    </div>
  ) : (
    ""
  );
};

export default PlatformList;