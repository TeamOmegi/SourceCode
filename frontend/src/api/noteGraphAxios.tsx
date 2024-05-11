import axios from "axios";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

interface Node {
  nodeId: number;
  idx: number;
  value: string;
  type: string;
}

interface Link {
  source: number;
  target: number;
}

interface GraphData {
  nodes: Node[];
  edges: Link[];
}

export const getGraphData = async (): Promise<{
  nodes: Node[];
  links: Link[];
} | null> => {
  try {
    const response = await axios.get<GraphData>(`${BASE_URL}/notes/graph`);
    const Nodes: Node[] = response.data.response.nodes.map(
      (node: {
        nodeId: number;
        index: number;
        value: string;
        type: string;
      }) => {
        return {
          nodeId: node.nodeId,
          idx: node.index,
          value: node.value,
          type: node.type,
        };
      },
    );
    const Links: Link[] = response.data.response.edges.map(
      (edge: { sourceIndex: number; targetIndex: number }) => {
        return {
          source: edge.sourceIndex,
          target: edge.targetIndex,
        };
      },
    );
    console.log("getGraphData axios 잘 들어옴~~~~");
    return {
      nodes: Nodes,
      links: Links,
    };
  } catch (error) {
    console.error("Failed to get graph data", error);
    return null;
  }
};

// 노트 연결
export const linkCreate = async (noteId: number, targetNoteId: number) => {
  console.log("연결할 noteId", noteId);
  console.log("연결할 targetNoteId", targetNoteId);
  console.log("여기는 들어오나? ㅜㅜ ");
  try {
    const response = await axios.post(`${BASE_URL}/notes/link`, {
      noteId: noteId,
      targetNoteId: targetNoteId,
    });
    console.log("링크 생성 개열받네");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Fail linkCreate", error);
  }
};

// 링크 삭제
export const linkDelete = async (noteId: number, targetNoteId: number) => {
  console.log("삭제할 noteId", noteId);
  console.log("삭제할 targetNoteId", targetNoteId);

  try {
    const response = await axios.delete(`${BASE_URL}/notes/link`, {
      noteId: noteId,
      targetNoteId: targetNoteId,
    });
    console.log("링크 삭제 개열받네");
    console.log("링크삭제완료됨요 ~~~~~ ", response.data);
    return response.data;
  } catch (error) {
    console.error("Fail linkDelete", error);
  }
};
