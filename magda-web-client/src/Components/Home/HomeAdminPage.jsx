import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import MagdaDocumentTitle from "Components/i18n/MagdaDocumentTitle";

import ContentImageEditor from "Components/Common/ContentImageEditor";

import { ToggleEditor } from "Components/Editing/ToggleEditor";
import { textEditor } from "Components/Editing/Editors/textEditor";

import { writeContent } from "actions/contentActions";

class HomeAdminPage extends Component {
    render() {
        const { hasEditPermissions, content } = this.props;
        const save = field => {
            return async value => {
                await writeContent(field, value, "application/json");
            };
        };
        return (
            <MagdaDocumentTitle prefixes={["Configure Site"]}>
                <div>
                    <h1>Configure Site</h1>
                    <h2>Logos</h2>
                    <h3>Desktop Logo</h3>
                    <p>
                        <ContentImageEditor
                            imageItemId={"header/logo"}
                            hasEditPermissions={hasEditPermissions}
                            accept="image/*"
                        />
                    </p>
                    <h3>Mobile Logo</h3>
                    <p>
                        <ContentImageEditor
                            imageItemId={"header/logo-mobile"}
                            hasEditPermissions={hasEditPermissions}
                            accept="image/*"
                        />
                    </p>
                    <h3>Icon</h3>
                    <p>
                        <ContentImageEditor
                            imageItemId={"favicon.ico"}
                            hasEditPermissions={hasEditPermissions}
                            accept="image/x-icon"
                        />
                    </p>
                    <h2>Taglines</h2>
                    <h3>Desktop Tagline</h3>
                    <ToggleEditor
                        enabled={hasEditPermissions}
                        value={content.desktopTagLine}
                        onChange={save("home/tagline/desktop")}
                        editor={textEditor}
                    />
                    <h3>Mobile Tagline</h3>
                    <ToggleEditor
                        enabled={hasEditPermissions}
                        value={content.mobileTagLine}
                        onChange={save("home/tagline/mobile")}
                        editor={textEditor}
                    />
                </div>
            </MagdaDocumentTitle>
        );
    }
}

function mapStateToProps(state, old) {
    const hasEditPermissions =
        state.userManagement &&
        state.userManagement.user &&
        state.userManagement.user.isAdmin;
    return {
        content: state.content,
        hasEditPermissions
    };
}

export default withRouter(connect(mapStateToProps)(HomeAdminPage));
