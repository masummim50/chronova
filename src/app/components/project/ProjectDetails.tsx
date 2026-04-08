import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
} from "@mui/material";
import ProjectTasks from "./ProjectTasks";

import { useGetPersonalProjectByIdQuery } from "../../redux/features/project/project.api";
import AddMember from "./AddMemberTailwind";

import ProjectDetailsLoadingTailwind from "../loadingSkeletons/ProjectDetailsLoadingTailwind";
import ProjectDetailsAccordion from "./ProjectDetailsAccordion";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetPersonalProjectByIdQuery(id);
  return (
    <Box>
      {isLoading &&
        // <ProjectDetailsLoading />
        <ProjectDetailsLoadingTailwind />

      }
      {data?.success && (
        <>
          <Typography fontSize={30}>{data?.data?.name}</Typography>

          {/* <Accordion sx={{ marginBottom: "10px" }}>
            <AccordionSummary
              sx={{
                "&.MuiAccordionSummary-content": { padding: 0, margin: 0 },
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
                {data?.data?.description}
              </pre>
            </AccordionDetails>
          </Accordion> */}

          <ProjectDetailsAccordion data={data?.data?.description} />

          {data?.data?.type == "team" && <AddMember project={data?.data} />}
          <ProjectTasks project={data?.data} />
        </>
      )}
      {error && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            borderRadius: 2,
          }}
        >
          An Unknown Error Occured
        </Box>
      )}
    </Box>
  );
};

export default ProjectDetails;
