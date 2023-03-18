import { IItem, ITimeline } from "./interfaces/ITimeLine";

function Timeline(props: ITimeline) {
  return (
    <>
      {props.items.length > 0 ? (
        <div className="p-2">
          <ol className="border-l warm-gray-900 dark:border-neutral-900">
            {props.items.map((item: IItem) => (
              <li key={item.id}>
                <div className="flex-start flex items-center pt-3">
                  <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full warm-gray-900 dark:bg-neutral-500"></div>
                  <p className="text-sm warm-gray-900 dark:text-neutral-900">
                    {item.dateCreated.split("T")[0]}
                  </p>
                </div>
                <div className="mt-2 ml-4 mb-6">
                  <h4 className="mb-1.5 text-xl font-semibold">{item.name}</h4>
                  <p className="mb-3 warm-gray-900 dark:text-neutral-900">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        "Naujienų nėra"
      )}
    </>
  );
}

export default Timeline;
