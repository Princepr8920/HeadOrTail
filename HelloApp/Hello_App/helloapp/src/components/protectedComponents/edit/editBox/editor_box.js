import useTheme from "../../../../hooks/usefulHooks/useTheme";
import "./editor_box.scss";
import Personal_Info from "./elements/edit_personal";
import Account from "./elements/edit_account";
import Security from "./elements/edit_security";
import Preferences from "./elements/edit_preferences";
import Timeline from "./elements/edit_timeline";
import Tasks from "./elements/edit_tasks";
import Danger_Zone from "./elements/edit_danger";
import useView from "../../../../hooks/usefulHooks/useView";
import Edit_Success from "../../../usefulComponents/success/success";
import Edit_verification from "../edit_verification/edit_verification";
import Header from "../../reuseableComponents/header";
export default function Editor_Box({ disableEdit, FieldName }) {
  const {
    theme: {
      theme_profile: { components_background },
    },
  } = useTheme();
  const { view } = useView();

  const elements = [
    { name: "Personal Information", JSX: <Personal_Info key="0" /> },
    { name: "Account", JSX: <Account key="1" /> },
    { name: "Security", JSX: <Security key="2" /> },
    { name: "Prefrences", JSX: <Preferences key="3" /> },
    { name: "Timeline", JSX: <Timeline key="4" /> },
    { name: "Tasks", JSX: <Tasks key="5" /> },
    { name: "Danger-Zone", JSX: <Danger_Zone key="6" /> },
  ];

  return (
    <>
      <section id="editor_box_container">
        {!view.edit_operation.success && view.verification.isVerified ? (
          <div className={`editor_Box ${components_background}`}>
            <Header name={FieldName} link={false} backClick={disableEdit} />
            <div id="fields">
              {elements.map((e) => (e.name === FieldName ? e.JSX : ""))}
            </div>
          </div>
        ) : !view.verification.isVerified ? (
          <Edit_verification cancel_verification={disableEdit} />
        ) : (
          <Edit_Success disableEdit={disableEdit} />
        )}
      </section>
    </>
  );
}
