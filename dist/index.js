const core = require('@actions/core')
const github = require('@actions/github')

(async () => {
    try {
        const token = core.getInput('GITHUB_TOKEN')
        const pullRequestNumber = core.getInput('PR_NUMBER')
        const octokit = github.getOctokit(token)

        const { data: pullRequest } = await octokit.rest.pulls.get({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            pull_number: parseInt(pullRequestNumber),
        });
    } catch (error) {
        await core.setFailed(error.stack || error.message)
      }
})();