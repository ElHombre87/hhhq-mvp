// Required from quill-editor since it doesn't render server side
import dynamic from 'next/dynamic';

export default dynamic(() => import('@mantine/rte'), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});
