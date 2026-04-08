import { useParams } from "react-router-dom";
import { useGetPersonalProjectByIdQuery } from "../../redux/features/project/project.api";
import PersonalOverviewTailwind from "./overview/PersonalOverviewTailwind";
import GroupOverviewTailwind from "./overview/GroupOverviewTailwind";

const ProjectOverview = () => {
  const { id } = useParams();
  const { data } = useGetPersonalProjectByIdQuery(id);

  return data?.data?.type === "personal" ? (
    <PersonalOverviewTailwind data={data.data} />
  ) : (
    <GroupOverviewTailwind data={data.data} />
  );
};

export default ProjectOverview;
