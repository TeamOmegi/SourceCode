from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel

from dto.Trace import TraceSpan


class ErrorLog(BaseModel):
    project_id: int
    service_id: int
    trace: List[TraceSpan]
    error_type: Optional[str]
    summary: Optional[str]
    time: datetime
    log: Optional[str]

    def to_dict(self):
        return self.dict(exclude_unset=True) # 값이 설정되지 않은 필드를 제외하는 옵션
