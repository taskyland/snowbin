import type { FC } from 'hono/jsx'

export const What: FC = () => {
  return (
    <>
      <h2>
        <a href='/'>snowbin</a>
      </h2>
      <p>
        Snowbin is a delightfully crafted pastebin with markdown support. Pastes
        are saved upto 7 days before being deleted. snowbin is a work in
        progress, not everything is complete.
      </p>
      <h2>Usage</h2>
      <p>
        Usual commonmark compliant markdown syntax is supported with extensions
        like Shiki for code highlighting, emoji and much more coming soon. Only
        TypeScript and JavaScript languages are supported due to technical
        limitations and will be fixed soon.
      </p>

      <h2>Terms of Usage</h2>
      <h4>Content</h4>
      <p>
        snowbin allows you to create markdown pastes/documents that link, share
        and otherwise make available certain information, text, videos, or other
        material ("Content"). You are therefore responsible for the content that
        you create through our service. The type of content that is disallowed
        but not limited to on our service:
        <ul>
          <li>
            Advertisements, promotions, or any media meant to showcase external
            media exclusively
          </li>
          <li>
            Harassment, hate-speech and/or targetting with malicious intent of
            specific indiviual(s)
          </li>
          <li>
            Distribution of malware such as destructive scripts, linking to
            imagery that depicts real-life violence, gore or animal cruelty
          </li>
          <li>
            Encouraging or glorifying self-harm, suicide or otherwise content
            forbidden by this Terms of Service policy
          </li>
          <li>
            Denial of Service attacks to overload the service out of its
            reasonable compute limits, this also includes automatically creating
            new pastes after their 7 day lifetime (API requests must be
            rate-limited properly)
          </li>
        </ul>
        Snowbin admins reserve all rights to delete your content without warning
        (there is no system to notify you). To report any of the above activity,
        contact me <a href='mailto:tasky@fmhy.net'>here.</a>
      </p>
    </>
  )
}
