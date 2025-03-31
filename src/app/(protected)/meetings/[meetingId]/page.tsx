import IssueList from "./issue-list"

type Props = {
    params : Promise< {meetingId:string} >
}

const MeetingDetailsPage = async({ params } : Props)=>{
    const {meetingId} = await params
    return (
        <IssueList meetingId={meetingId}/>
    )
}

export default MeetingDetailsPage