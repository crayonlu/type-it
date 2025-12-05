// blog展示的tag
import { Badge } from '@/components/ui/badge';

export default function Tag(props:{
  tag: string
  // todo: 点击之后跳转到对应标签blogs
}){
  return (
    <Badge>{props.tag}</Badge>
  );
}