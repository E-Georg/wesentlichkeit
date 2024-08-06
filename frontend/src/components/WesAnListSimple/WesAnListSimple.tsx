import React, { useState } from "react";
import useGroupSubGroupData from "../Queries/useGroupSubGroup";
import useSurveyQuestionAverageValues from "../Queries/useSurveyQuestionAverageValues";
import useStakeholderData from "../Queries/useStakeholderData";
import ModalComponent from "../WesAnModal/WesAnModal";
import "./WesAnListSimple.scss";

type Props = {};

const WesAnListSimple = (_: Props) => {
  const { GroupSubGroup, isLoading: load } = useGroupSubGroupData();
  const { SurveyQuestionAverageValues, isLoadingQuestionsAverage } =
    useSurveyQuestionAverageValues();
  const { Stakeholder, isStakeholderLoading } = useStakeholderData();

  const {
    SubStakeholderSurveyQuestionComments,
    isLoadingSubStakeholderComments,
  } = useSurveyQuestionAverageValues();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);
  const [currentGroupTitle, setCurrentGroupTitle] = useState("");

  console.clear();
  console.table(SubStakeholderSurveyQuestionComments);

  if (load || isLoadingQuestionsAverage || isStakeholderLoading) {
    return <div className="loading">Loading...</div>;
  }

  const stakeholderMap = Stakeholder.reduce((acc, stakeholder) => {
    acc[stakeholder.id] = stakeholder.title;
    return acc;
  }, {} as Record<number, string>);

  const flattenedData = SurveyQuestionAverageValues.map((group) => ({
    groupId: group.groupId,
    groupTitle: group.groupTitle,
    groupAverageTotal: group.groupAverageTotal,
    subgroupAverage:
      group.subGroups.reduce(
        (acc, subGroup) => acc + subGroup.subgroupAverage,
        0
      ) / group.subGroups.length,
  }));

  const openModal = (groupTitle, groupId) => {
    const groupComment = SubStakeholderSurveyQuestionComments.find(
      (group) => group.groupId === groupId
    );

    setCurrentComments(groupComment ? groupComment.Messages : []);
    setCurrentGroupTitle(groupTitle);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="wes-an-matrix">
      <table className="matrix-table">
        <thead>
          <tr>
            <th className="header-group-title">Group Title</th>
            <th className="header-group-text">Stakeholderbefragung Text</th>
            <th className="header-group-average">Group Average</th>
            {Stakeholder.map((stakeholder) => (
              <th className="header-stakeholder" key={stakeholder.id}>
                {stakeholder.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flattenedData.map((group) => (
            <tr key={group.groupId}>
              <td className="group-title">{group.groupTitle}</td>

              <td
                className="group-text"
                onClick={() => openModal(group.groupTitle, group.groupId)}
              ></td>
              <td className="group-average">{group.groupAverageTotal}</td>
              {Stakeholder.map((stakeholder) => (
                <td
                  className="stakeholder-average"
                  key={`${stakeholder.id}-${group.groupId}`}
                >
                  {SurveyQuestionAverageValues.find(
                    (g) => g.groupId === group.groupId
                  )?.subGroups.find(
                    (subGroup) => subGroup.stakeholderId === stakeholder.id
                  )?.subgroupAverage || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ModalComponent
        isOpen={modalIsOpen}
        onClose={closeModal}
        groupTitle={currentGroupTitle}
        comments={currentComments}
      />
    </div>
  );
};

export default WesAnListSimple;
