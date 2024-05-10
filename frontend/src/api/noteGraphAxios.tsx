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
        console.log("node", node);
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
export const linkCreate = async (newLink: Link) => {
  try {
    const response = await axios.post<Link>(`${BASE_URL}/notes/link`, newLink);
    return response.data;
  } catch (error) {
    console.error("Fail linkCreate", error);
  }
};

// 링크 삭제
export const linkDelete = async (
  sourceNodeId: number,
  targetNodeId: number,
) => {
  console.log("sourceNodeId", sourceNodeId);
  console.log("targetNodeId", targetNodeId);
  console.log("링크 삭제 개열받네");
  try {
    const response = await axios.delete(
      `${BASE_URL}/notes/link`, // 수정된 URL 형식
      {
        noteId: sourceNodeId,
        targetNoteId: targetNodeId,
      },
    );
    console.log("링크삭제완료됨요 ~~~~~ ", response.data);
    return response.data;
  } catch (error) {
    console.error("Fail linkDelete", error);
  }
};
