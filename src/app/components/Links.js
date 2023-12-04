export default function Links(props) {
    function getPlatform(membershipType) {
        switch (membershipType) {
            case 1:
                return "xb";
            case 2:
                return "ps";
            case 3:
                return "pc";
            case 4:
                return "blizz"; // not sure if correct -- Battle.net is no longer supported
            case 5:
                return "stadia";
            case 6:
                return "egs"; // assumption -- EGS is a recent addition
            default:
                return "pc";
        }
    }

    return (
        <div className="links">
            <h2>Links</h2>
            <a
                href={`https://raid.report/${getPlatform(
                    props.membershipType
                )}/${props.membershipId}`}
                target="_blank"
            >
                <img src="https://raid.report/favicon.ico" />
                Raid Report
            </a>
            <a
                href={`https://dungeon.report/${getPlatform(
                    props.membershipType
                )}/${props.membershipId}`}
                target="_blank"
            >
                <img src="https://dungeon.report/favicon.ico" /> Dungeon Report
            </a>
            <a
                href={`https://gm.report/${props.membershipId}`}
                target="_blank"
            >
                <img src="https://gm.report/favicon-16x16.png" /> Grandmaster
                Report
            </a>
            <a
                href={`https://strike.report/${getPlatform(
                    props.membershipType
                )}/${props.membershipId}`}
                target="_blank"
            >
                <img src="https://s2.googleusercontent.com/s2/favicons?domain=https://strike.report/" />{" "}
                Strike Report
            </a>
            <a
                href={`https://destinytrialsreport.com/report/${props.membershipType}/${props.membershipId}`}
                target="_blank"
            >
                <img src="https://destinytrialsreport.com/assets/favicon/favicon-16x16.png" />{" "}
                Trials Report
            </a>
        </div>
    );
}
