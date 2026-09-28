import { expect, test, type Locator, type Page } from "@playwright/test"
import { projectStories } from "../lib/project-stories"

async function activate(page: Page, locator: Locator) {
  if (await page.evaluate(() => navigator.maxTouchPoints > 0))
    await locator.tap()
  else await locator.click()
}

async function inViewport(page: Page, locator: Locator) {
  const rect = await locator.boundingBox()
  expect(rect).not.toBeNull()
  const viewport = page.viewportSize()!
  expect(rect!.x).toBeGreaterThanOrEqual(-1)
  expect(rect!.y).toBeGreaterThanOrEqual(-1)
  expect(rect!.x + rect!.width).toBeLessThanOrEqual(viewport.width + 1)
  expect(rect!.y + rect!.height).toBeLessThanOrEqual(viewport.height + 1)
}

async function touchTarget(locator: Locator) {
  const rect = await locator.boundingBox()
  expect(rect!.width).toBeGreaterThanOrEqual(44)
  expect(rect!.height).toBeGreaterThanOrEqual(44)
}

async function noHorizontalClipping(page: Page, scope = "main") {
  const issues = await page.locator(scope).evaluate((root) => {
    const problems: string[] = []
    const viewport = document.documentElement.clientWidth
    if (document.documentElement.scrollWidth > viewport + 1)
      problems.push("page overflow")
    for (const element of [root, ...Array.from(root.querySelectorAll("*"))]) {
      if (!(element instanceof HTMLElement)) continue
      if (element.closest('[aria-hidden="true"], .sr-only, [hidden]')) continue
      const rect = element.getBoundingClientRect()
      if (
        !rect.width ||
        !rect.height ||
        getComputedStyle(element).visibility === "hidden"
      )
        continue
      if (rect.left < -1 || rect.right > viewport + 1)
        problems.push(
          `${element.tagName}.${element.className}: outside viewport`
        )
      // Text can be clipped without making the document itself scroll sideways.
      if (
        element.clientWidth > 0 &&
        element.scrollWidth > element.clientWidth + 2 &&
        !element.matches("input, textarea, .tech-flip-card__inner")
      ) {
        problems.push(
          `${element.tagName}.${element.className}: internal overflow (${element.scrollWidth}/${element.clientWidth})`
        )
      }
    }
    return problems
  })
  expect(issues).toEqual([])
}

async function noOverlap(locators: Locator[]) {
  const rects = await Promise.all(
    locators.map((locator) => locator.boundingBox())
  )
  for (let a = 0; a < rects.length; a++) {
    for (let b = a + 1; b < rects.length; b++) {
      const first = rects[a]!,
        second = rects[b]!
      const intersectionWidth =
        Math.min(first.x + first.width, second.x + second.width) -
        Math.max(first.x, second.x)
      const intersectionHeight =
        Math.min(first.y + first.height, second.y + second.height) -
        Math.max(first.y, second.y)
      expect(
        intersectionWidth > 1 && intersectionHeight > 1,
        `overlap between items ${a} and ${b}`
      ).toBe(false)
    }
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto("/")
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator("html")).toHaveClass(/lenis/)
  await page.waitForTimeout(1400)
})

test("skill narratives and contact delivery states", async ({ page }) => {
  let delivery: "success" | "error" = "success"
  let submissions = 0

  await page.route("**/api/contact", async (route) => {
    submissions += 1
    await route.fulfill(
      delivery === "success"
        ? { json: { success: true } }
        : {
            status: 502,
            contentType: "application/json",
            body: JSON.stringify({
              error: "Something went wrong. Please try again.",
            }),
          }
    )
  })

  const opener = page.getByRole("button", {
    name: "Open Next.js skill details",
  })
  await page.locator("#technical").scrollIntoViewIfNeeded()
  await page.getByRole("button", { name: "Pause motion" }).click()
  await opener.click()

  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole("heading", { name: "Next.js" })).toBeFocused()
  await expect(dialog.locator(".skill-detail-heading > p")).toHaveText(
    "Framework"
  )
  await expect(dialog.locator(".skill-detail-explanation > p")).toHaveCount(3)
  await expect(dialog.locator(".skill-detail-usage")).toHaveText(
    "Used in: This portfolio"
  )
  const explanationWords = await dialog
    .locator(".skill-detail-explanation > p:not(.skill-detail-usage)")
    .allTextContents()
  const wordCount = explanationWords.join(" ").trim().split(/\s+/).length
  expect(wordCount).toBeGreaterThanOrEqual(80)
  expect(wordCount).toBeLessThanOrEqual(150)
  await noHorizontalClipping(page, "dialog")

  await page.keyboard.press("Escape")
  await expect(dialog).toHaveCount(0)
  await expect(opener).toBeFocused()

  await page.getByRole("button", { name: "Switch to dark mode" }).click()
  await expect(page.locator("html")).toHaveClass(/dark/)

  const form = page.getByRole("form", { name: "Send Michael a message" })
  const send = form.getByRole("button", { name: "Send Message" })
  await send.click()
  await expect(page.locator("#contact-name")).toBeFocused()
  await expect(page.locator("#contact-name-error")).toBeVisible()

  await page.locator("#contact-name").fill("Portfolio visitor")
  await page.locator("#contact-email").fill("invalid-email")
  await page
    .locator("#contact-message")
    .fill("I would like to discuss a project.")
  await send.click()
  await expect(page.locator("#contact-email-error")).toBeVisible()

  await page.locator("#contact-email").fill("visitor@example.com")
  await send.evaluate((button: HTMLButtonElement) => {
    button.click()
    button.click()
  })
  await expect(form.getByRole("status")).toContainText(
    "Message sent successfully"
  )
  expect(submissions).toBe(1)

  delivery = "error"
  await page.locator("#contact-name").fill("Portfolio visitor")
  await page.locator("#contact-email").fill("visitor@example.com")
  await page.locator("#contact-message").fill("Please retry this message.")
  await send.click()
  await expect(form.getByRole("status")).toContainText(
    "Something went wrong. Please try again."
  )
  expect(submissions).toBe(2)
  await noHorizontalClipping(page, "#contact")
})

test("sections, navigation, touch controls and contact in both themes", async ({
  page,
}, testInfo) => {
  const width = page.viewportSize()!.width
  const pageErrors: string[] = []
  page.on("pageerror", (error) => pageErrors.push(error.message))
  // Exercise the UI delivery states without sending an actual email.
  let submissions = 0
  await page.route("**/api/contact", async (route) => {
    submissions++
    await route.fulfill({ json: { success: true } })
  })

  for (const theme of ["light", "dark"]) {
    if (theme === "dark")
      await activate(
        page,
        page.getByRole("button", { name: "Switch to dark mode" })
      )
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }))
    await page.waitForTimeout(500)
    expect(
      await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    ).toBe(theme === "light" ? "rgb(241, 241, 241)" : "rgb(1, 1, 1)")
    await noOverlap([
      page.locator(".hero-intro"),
      page.locator(".hero-portrait"),
      page.locator(".hero-details"),
    ])
    await noHorizontalClipping(page)
    const shell = await page.locator(".page-shell").boundingBox()
    expect(Math.abs(shell!.width - width)).toBeLessThan(2)
    expect(Math.abs(shell!.x)).toBeLessThan(2)
    await expect(page.locator('#work, a[href="#work"]')).toHaveCount(0)
    await expect(
      page.getByRole("heading", { name: "FEATURED WORK", exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "SELECTED WORK", exact: true })
    ).toHaveCount(0)
    const portrait = page.getByAltText("Michael Velez", { exact: true })
    await expect(portrait).toBeVisible()
    expect(
      await portrait.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0
      )
    ).toBe(true)
    const resume = page.getByRole("link", { name: "Download resume" })
    const toggle = page.getByRole("button", { name: /Switch to .* mode/ })
    await inViewport(page, resume)
    await inViewport(page, toggle)
    await touchTarget(resume)
    await touchTarget(toggle)
    const visibleCards = page.locator(".tech-flip-card:visible")
    await expect(visibleCards).toHaveCount(width < 640 ? 4 : 6)
    const names = await page
      .locator(
        '.tech-flip-card:visible [aria-hidden="false"] .tech-flip-card__name'
      )
      .allTextContents()
    expect(new Set(names).size).toBe(names.length)
    await page.screenshot({ path: testInfo.outputPath(`hero-${theme}.png`) })

    if (width < 1024) {
      await activate(
        page,
        page.getByRole("button", { name: "Open navigation menu" })
      )
      const menu = page.getByRole("navigation", { name: "Mobile navigation" })
      await expect(menu).toBeVisible()
      await inViewport(page, menu)
      await expect(menu.getByRole("link")).toHaveText([
        "Projects",
        "Teaching",
        "Technical",
        "Education",
        "Certificates",
        "Contact",
      ])
      await activate(
        page,
        menu.getByRole("link", { name: "Projects", exact: true })
      )
      await expect(menu).toHaveCount(0)
      await expect
        .poll(() =>
          page
            .locator("#projects-heading")
            .evaluate((el) => el.getBoundingClientRect().top)
        )
        .toBeLessThan(page.viewportSize()!.height)
      await activate(
        page,
        page.getByRole("button", { name: "Open navigation menu" })
      )
      await activate(
        page,
        menu.getByRole("link", { name: "Contact", exact: true })
      )
      await expect(menu).toHaveCount(0)
    } else {
      const navigation = page.getByRole("navigation", {
        name: "Main navigation",
        exact: true,
      })
      await noOverlap([resume, navigation, toggle])
      const navRect = await navigation.boundingBox()
      expect(
        Math.abs(navRect!.x + navRect!.width / 2 - width / 2)
      ).toBeLessThan(2)
      await expect(navigation.getByRole("link")).toHaveText([
        "Projects",
        "Teaching",
        "Technical",
        "Education",
        "Certificates",
        "Contact",
      ])
      await activate(
        page,
        navigation.getByRole("link", { name: "Projects", exact: true })
      )
      await expect
        .poll(() =>
          page
            .locator("#projects-heading")
            .evaluate((el) => el.getBoundingClientRect().top)
        )
        .toBeLessThan(page.viewportSize()!.height)
      await activate(
        page,
        navigation.getByRole("link", { name: "Contact", exact: true })
      )
    }
    await expect
      .poll(() =>
        page.locator("#contact").evaluate((el) => {
          const rect = el.getBoundingClientRect()
          // The final section may reach the end of the document before the anchor offset.
          return Math.abs(rect.top - Math.max(88, innerHeight - rect.height))
        })
      )
      .toBeLessThan(3)

    for (const id of [
      "projects",
      "teaching",
      "technical",
      "education",
      "certificates",
      "contact",
    ]) {
      const section = page.locator(`#${id}`)
      await section.scrollIntoViewIfNeeded()
      await page.waitForTimeout(900)
      await noHorizontalClipping(page, `#${id}`)
      const sectionRect = await section.boundingBox()
      expect(Math.abs(sectionRect!.width - width)).toBeLessThan(2)
      expect(Math.abs(sectionRect!.x)).toBeLessThan(2)
      if (id !== "contact")
        await expect(section.locator("xpath=..")).toHaveClass(/is-visible/)
      await section.screenshot({
        path: testInfo.outputPath(`${id}-${theme}.png`),
        animations: "disabled",
        style:
          'body > header, button[aria-label="Back to top"] { visibility: hidden !important; }',
      })
    }
    const projectList = page.getByRole("list", {
      name: "Featured projects",
      exact: true,
    })
    const projectRows = projectList.getByRole("listitem")
    await expect(projectRows).toHaveCount(4)
    await expect(page.locator("#projects img")).toHaveCount(0)
    const listRect = (await projectList.boundingBox())!
    expect(listRect.height).toBeLessThan(width >= 768 ? 640 : 840)
    let previousBottom = listRect.y
    for (const row of await projectRows.all()) {
      const rect = (await row.boundingBox())!
      expect(Math.abs(rect.width - listRect.width)).toBeLessThan(2)
      expect(Math.abs(rect.height - (listRect.height - 1) / 4)).toBeLessThan(2)
      expect(Math.abs(rect.y - previousBottom)).toBeLessThan(2)
      previousBottom = rect.y + rect.height
      await touchTarget(row.getByRole("button"))
      await noOverlap([row.getByRole("heading"), row.getByRole("button")])
    }
    const titles = await page.locator("#projects h3").allTextContents()
    expect(titles.map((title) => title.trim())).toEqual(
      projectStories.map((project) => project.title)
    )
    for (const button of await page.locator("#teaching button").all()) {
      await activate(page, button)
      // Illustrations may remain open from the preceding theme check.
      if ((await button.getAttribute("aria-expanded")) !== "true")
        await activate(page, button)
      await expect(button).toHaveAttribute("aria-expanded", "true")
      await touchTarget(button)
      const visualId = await button.getAttribute("aria-controls")
      await expect(page.locator(`#${visualId}`).getByRole("img")).toBeVisible()
      await button.focus()
      await page.keyboard.press("Space")
      await expect(button).toHaveAttribute("aria-expanded", "false")
      await page.keyboard.press("Enter")
      await expect(button).toHaveAttribute("aria-expanded", "true")
      await page.waitForTimeout(1000)
      await noHorizontalClipping(page, "#teaching")
    }
    await page.locator("#teaching").screenshot({
      path: testInfo.outputPath(`teaching-open-${theme}.png`),
      animations: "disabled",
      style:
        'body > header, button[aria-label="Back to top"] { visibility: hidden !important; }',
    })
    const technologies: Record<string, string[]> = {
      web: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Laravel",
        "PHP",
        "HTML",
        "CSS",
      ],
      mobile: ["Flutter", "Dart", "Firebase"],
      backend: ["MySQL", "Supabase", "C#", "ASP.NET", "Entity Framework"],
      tools: ["Git"],
    }
    const panelHeight = await page
      .locator(".technology-panels")
      .evaluate((el) => el.getBoundingClientRect().height)
    for (const [id, skills] of Object.entries(technologies)) {
      const tab = page.locator(`#technology-tab-${id}`)
      await activate(page, tab)
      await expect(tab).toHaveAttribute("aria-selected", "true")
      await touchTarget(tab)
      await expect(page.getByRole("tabpanel")).toHaveCount(1)
      await expect(page.getByRole("tabpanel").getByRole("listitem")).toHaveText(
        skills
      )
      expect(
        await page
          .locator(".technology-panels")
          .evaluate((el) => el.getBoundingClientRect().height)
      ).toBe(panelHeight)
      await noHorizontalClipping(page, "#technical")
    }
    await page.locator("#technology-tab-tools").focus()
    await page.keyboard.press("Home")
    await expect(page.locator("#technology-tab-web")).toBeFocused()
    await page.keyboard.press("ArrowDown")
    await expect(page.locator("#technology-tab-mobile")).toHaveAttribute(
      "aria-selected",
      "true"
    )
    await page.keyboard.press("Tab")
    await expect(page.locator("#technology-panel-mobile")).toBeFocused()
    await expect(page.locator("#education h3")).toHaveText([
      "University of Mindanao",
      "Ateneo de Davao University",
    ])
    const masters = page
      .locator("#education article")
      .filter({ hasText: "Ateneo de Davao University" })
    await expect(masters).toContainText("Master in Information Technology")
    await expect(masters).toContainText("Currently pursuing")
    await expect(masters).not.toContainText(/Graduated|202\d/)
    await expect(page.locator("#education")).toContainText("Magna Cum Laude")
    for (const certificate of await page.locator("#certificates a").all()) {
      await expect(certificate).toHaveAttribute("href", /\/cert\d\.png/)
      await expect(certificate).toHaveAttribute("target", "_blank")
      await touchTarget(certificate)
    }
    const random = page.getByRole("button", {
      name: /Tell me something random|Another one/,
    })
    await activate(page, random)
    await page.waitForTimeout(350)
    const previousFact = await page.locator(".hero-fact-copy").textContent()
    await activate(page, page.getByRole("button", { name: "Another one" }))
    await page.waitForTimeout(500)
    expect(await page.locator(".hero-fact-copy").textContent()).not.toBe(
      previousFact
    )
    await noOverlap([
      page.locator(".hero-intro"),
      page.locator(".hero-portrait"),
      page.locator(".hero-details"),
    ])
    await noHorizontalClipping(page)

    const form = page.getByRole("form", { name: "Send Michael a message" })
    await activate(page, form.getByRole("button", { name: "Send Message" }))
    await expect(page.locator("#contact-name")).toBeFocused()
    await expect(page.locator("#contact-name-error")).toBeVisible()
    await page.locator("#contact-name").fill("Responsive audit")
    await page.locator("#contact-email").fill("audit@example.com")
    await page
      .locator("#contact-message")
      .fill("Testing the responsive contact form with a mocked response.")
    await activate(page, form.getByRole("button", { name: "Send Message" }))
    await expect(form.getByRole("status")).toContainText(
      "Message sent successfully"
    )
    await noHorizontalClipping(page, "#contact")
    await activate(page, page.getByRole("button", { name: "Back to top" }))
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2)
  }
  expect(submissions).toBe(2)
  expect(pageErrors).toEqual([])
})

test("every project scene, motion controls, scroll locking and focus restoration", async ({
  page,
}, testInfo) => {
  for (const project of projectStories) {
    const opener = page.getByRole("button", {
      name: `Explore ${project.title} story`,
    })
    if (project.id === "massageease") {
      // The whole editorial row opens its story, including the space around its text.
      const row = page
        .getByRole("list", { name: "Featured projects", exact: true })
        .getByRole("listitem")
        .filter({
          has: page.getByRole("heading", { name: project.title, exact: true }),
        })
      await activate(page, row)
    } else if (project.id === "velez-creation" || project.id === "acs") {
      await opener.focus()
      await page.keyboard.press(project.id === "acs" ? "Space" : "Enter")
    } else {
      await activate(page, opener)
    }
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await page.waitForTimeout(800)
    await inViewport(page, dialog)
    await expect(page.locator("html")).toHaveClass(/lenis-stopped/)
    const scrollBefore = await page.evaluate(() => window.scrollY)
    for (let index = 0; index < project.scenes.length; index++) {
      await expect(dialog.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        String(index + 1)
      )
      await expect(dialog.locator(".story-heading")).toBeFocused()
      await noHorizontalClipping(page, ".project-story-dialog")
      await noOverlap([
        dialog.locator(".story-scene > div"),
        dialog.locator("figure"),
      ])
      for (const button of await dialog
        .locator("header button:visible, footer button:visible")
        .all()) {
        await inViewport(page, button)
        await touchTarget(button)
      }
      // Inspect the lower graphic, then ensure scene navigation returns to the top.
      await dialog.locator("figure").scrollIntoViewIfNeeded()
      expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore)
      await dialog.screenshot({
        path: testInfo.outputPath(`${project.id}-${index + 1}.png`),
      })
      if (index < project.scenes.length - 1) {
        await activate(
          page,
          dialog.getByRole("button", { name: "Next", exact: true })
        )
        await page.waitForTimeout(800)
        expect(
          await dialog.locator(".story-scroller").evaluate((el) => el.scrollTop)
        ).toBe(0)
      }
    }
    await activate(page, dialog.getByRole("button", { name: "Pause motion" }))
    await expect(dialog.locator(".story-shell")).toHaveAttribute(
      "data-motion-paused",
      "true"
    )
    await activate(page, dialog.getByRole("button", { name: "Resume motion" }))
    await page.keyboard.press("ArrowLeft")
    await expect(dialog.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      String(project.scenes.length - 1)
    )
    await page.keyboard.press("ArrowRight")
    await activate(
      page,
      dialog.getByRole("button", { name: "Next story", exact: true })
    )
    await expect(dialog.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "1"
    )
    await page.keyboard.press("Tab")
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement))
    ).toBe(true)
    await page.keyboard.press("Escape")
    await expect(dialog).toHaveCount(0)
    await expect(opener).toBeFocused()
    await expect(page.locator("html")).not.toHaveClass(/lenis-stopped/)
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("")
  }
})

test("reduced motion and dark story layout", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await activate(
    page,
    page.getByRole("button", { name: "Switch to dark mode" })
  )
  const names = await page
    .locator(
      '.tech-flip-card:visible [aria-hidden="false"] .tech-flip-card__name'
    )
    .allTextContents()
  await page.waitForTimeout(4500)
  expect(
    await page
      .locator(
        '.tech-flip-card:visible [aria-hidden="false"] .tech-flip-card__name'
      )
      .allTextContents()
  ).toEqual(names)
  await activate(
    page,
    page.getByRole("button", {
      name: "Explore Database Development illustration",
    })
  )
  expect(
    await page
      .locator(".lesson-connection")
      .evaluate((el) => getComputedStyle(el).animationName)
  ).toBe("none")
  await activate(page, page.locator("#technology-tab-mobile"))
  expect(
    await page
      .locator("#technology-panel-mobile .technology-panel-content")
      .evaluate((el) => getComputedStyle(el).animationName)
  ).toBe("none")
  await activate(
    page,
    page.getByRole("button", { name: "Explore MassageEase story" })
  )
  await expect(page.getByRole("button", { name: "Pause motion" })).toBeHidden()
  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("button", { name: "Close project story" })
  ).toBeFocused()
  const originalViewport = page.viewportSize()!
  await page.setViewportSize({
    width: originalViewport.height,
    height: originalViewport.width,
  })
  await inViewport(page, page.getByRole("dialog"))
  await noHorizontalClipping(page, ".project-story-dialog")
  await page.setViewportSize(originalViewport)
  await noHorizontalClipping(page, ".project-story-dialog")
  expect(
    await page
      .locator(".graphic-sweep")
      .evaluate((el) => getComputedStyle(el).animationName)
  ).toBe("none")
  await activate(
    page,
    page.getByRole("button", { name: "Close project story" })
  )
  await page.locator("#contact").scrollIntoViewIfNeeded()
  await activate(page, page.getByRole("button", { name: "Back to top" }))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})
