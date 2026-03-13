import { GetServerSideProps } from 'next'

const INFO_URL = 'https://info.hovanhoa.net'
const BASE_URL = 'https://hovanhoa.net'
const INSIGHT_URL = 'https://insight.hovanhoa.net'
const GALLERY_URL = 'https://gallery.hovanhoa.net'
const STATUS_URL = 'https://status.hovanhoa.net'

function generateRobots() {
  return `User-agent: *
Allow: /
Sitemap: ${INFO_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${INSIGHT_URL}/sitemap.xml
Sitemap: ${GALLERY_URL}/sitemap.xml
Sitemap: ${STATUS_URL}/sitemap.xml
Host: ${INFO_URL}
`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robots = generateRobots()

  res.setHeader('Content-Type', 'text/plain')
  res.write(robots)
  res.end()

  return {
    props: {},
  }
}

export default function Robots() {
  return null
}
